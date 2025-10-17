'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { products, brandInfo } from '@/data/products';
import { Product } from '@/types';
import { Plus, Minus, ShoppingCart, X, Sparkles } from 'lucide-react';

export default function BundleBuilderPage() {
  const [selectedProducts, setSelectedProducts] = useState<{ product: Product; quantity: number }[]>([]);
  const [bundleName, setBundleName] = useState('');
  const [filterBrand, setFilterBrand] = useState<string>('all');

  const addProduct = (product: Product) => {
    const existing = selectedProducts.find(p => p.product.id === product.id);
    if (existing) {
      setSelectedProducts(
        selectedProducts.map(p =>
          p.product.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, { product, quantity: 1 }]);
    }
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeProduct(productId);
      return;
    }
    setSelectedProducts(
      selectedProducts.map(p =>
        p.product.id === productId ? { ...p, quantity } : p
      )
    );
  };

  const calculateTotals = () => {
    const subtotal = selectedProducts.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    
    // Bundle discount based on number of items
    let discountPercent = 0;
    if (selectedProducts.length >= 5) discountPercent = 20;
    else if (selectedProducts.length >= 4) discountPercent = 15;
    else if (selectedProducts.length >= 3) discountPercent = 10;
    else if (selectedProducts.length >= 2) discountPercent = 5;

    const discount = (subtotal * discountPercent) / 100;
    const total = subtotal - discount;

    return { subtotal, discount, discountPercent, total };
  };

  const { subtotal, discount, discountPercent, total } = calculateTotals();

  const filteredProducts = products.filter(p => 
    filterBrand === 'all' || p.brand === filterBrand
  );

  const saveBundle = () => {
    if (selectedProducts.length < 2) {
      alert('Please select at least 2 products to create a bundle');
      return;
    }
    if (!bundleName.trim()) {
      alert('Please enter a bundle name');
      return;
    }

    // In production, save to database
    const bundle = {
      id: 'custom-' + Date.now(),
      name: bundleName,
      products: selectedProducts,
      discount: discountPercent,
      createdAt: new Date().toISOString(),
    };

    console.log('Saving bundle:', bundle);
    alert('Bundle created successfully! (In production, this would be saved to your account)');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Sparkles className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4">Bundle Builder</h1>
            <p className="text-xl text-purple-100">
              Create your own custom bundle and save up to 20%
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Select Products</h2>
              
              {/* Brand Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Filter by Brand</label>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => setFilterBrand('all')}
                    className={`px-4 py-2 rounded-lg transition ${
                      filterBrand === 'all'
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    All Brands
                  </button>
                  {Object.entries(brandInfo).map(([key, brand]) => (
                    <button
                      key={key}
                      onClick={() => setFilterBrand(key)}
                      className={`px-4 py-2 rounded-lg transition ${
                        filterBrand === key
                          ? 'text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                      style={{
                        backgroundColor: filterBrand === key ? brand.color : undefined,
                      }}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProducts.map((product) => {
                  const brand = brandInfo[product.brand];
                  const isSelected = selectedProducts.some(p => p.product.id === product.id);
                  
                  return (
                    <div
                      key={product.id}
                      className={`border-2 rounded-lg p-4 transition ${
                        isSelected
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="relative aspect-square rounded-lg overflow-hidden mb-3">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-xs font-semibold uppercase mb-1" style={{ color: brand.color }}>
                        {brand.name}
                      </p>
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-lg font-bold mb-3">৳{product.price.toFixed(2)}</p>
                      <button
                        onClick={() => addProduct(product)}
                        disabled={isSelected}
                        className={`w-full py-2 rounded-lg font-semibold transition ${
                          isSelected
                            ? 'bg-green-600 text-white cursor-default'
                            : 'bg-black text-white hover:bg-gray-800'
                        }`}
                      >
                        {isSelected ? '✓ Added' : 'Add to Bundle'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bundle Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-4">Your Bundle</h2>

              {/* Bundle Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Bundle Name</label>
                <input
                  type="text"
                  value={bundleName}
                  onChange={(e) => setBundleName(e.target.value)}
                  placeholder="e.g., My Perfect Outfit"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* Selected Products */}
              <div className="mb-6 max-h-64 overflow-y-auto space-y-3">
                {selectedProducts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No products selected</p>
                  </div>
                ) : (
                  selectedProducts.map((item) => (
                    <div key={item.product.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{item.product.name}</p>
                        <p className="text-sm text-gray-600">৳{item.product.price}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center border rounded hover:bg-gray-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeProduct(item.product.id)}
                        className="text-red-600 hover:bg-red-50 p-1 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Pricing */}
              {selectedProducts.length > 0 && (
                <>
                  <div className="space-y-2 mb-4 pb-4 border-b">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({selectedProducts.length} items)</span>
                      <span className="font-semibold">৳{subtotal.toFixed(2)}</span>
                    </div>
                    {discountPercent > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Bundle Discount ({discountPercent}%)</span>
                        <span className="font-semibold">-৳{discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between text-lg mb-6">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">৳{total.toFixed(2)}</span>
                  </div>

                  {/* Discount Tiers */}
                  <div className="mb-6 p-4 bg-purple-50 rounded-lg text-sm">
                    <p className="font-semibold mb-2">Bundle Savings:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li className={selectedProducts.length >= 2 ? 'text-green-600 font-semibold' : ''}>
                        2-3 items: 5-10% off {selectedProducts.length >= 2 && '✓'}
                      </li>
                      <li className={selectedProducts.length >= 4 ? 'text-green-600 font-semibold' : ''}>
                        4 items: 15% off {selectedProducts.length >= 4 && '✓'}
                      </li>
                      <li className={selectedProducts.length >= 5 ? 'text-green-600 font-semibold' : ''}>
                        5+ items: 20% off {selectedProducts.length >= 5 && '✓'}
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={saveBundle}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition mb-3"
                  >
                    Create Bundle
                  </button>
                  
                  <Link
                    href="/shop"
                    className="block w-full border-2 border-gray-300 text-center py-3 rounded-lg font-semibold hover:border-black transition"
                  >
                    Back to Shop
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
