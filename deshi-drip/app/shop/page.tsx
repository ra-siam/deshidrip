'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products, brandInfo } from '@/data/products';
import { Brand } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const [selectedBrand, setSelectedBrand] = useState<Brand | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    const brandParam = searchParams.get('brand');
    if (brandParam && ['zeroone', 'zerotwo', 'zerothree', 'zerofour'].includes(brandParam)) {
      setSelectedBrand(brandParam as Brand);
    }
  }, [searchParams]);

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Filter products
  const filteredProducts = products.filter(product => {
    const brandMatch = selectedBrand === 'all' || product.brand === selectedBrand;
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    return brandMatch && categoryMatch;
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Shop All</h1>
          <p className="text-gray-400">
            {filteredProducts.length} products available
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Brand</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className={`block w-full text-left px-3 py-2 rounded transition ${
                      selectedBrand === 'all'
                        ? 'bg-black text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    All Brands
                  </button>
                  {Object.entries(brandInfo).map(([key, brand]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedBrand(key as Brand)}
                      className={`block w-full text-left px-3 py-2 rounded transition ${
                        selectedBrand === key
                          ? 'text-white'
                          : 'hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: selectedBrand === key ? brand.color : 'transparent',
                      }}
                    >
                      {brand.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === category
                          ? 'bg-black text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category === 'all' ? 'All Categories' : category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <p className="text-gray-500 text-lg">
                  No products found matching your filters.
                </p>
                <button
                  onClick={() => {
                    setSelectedBrand('all');
                    setSelectedCategory('all');
                  }}
                  className="mt-4 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="text-xl">Loading...</div></div>}>
      <ShopContent />
    </Suspense>
  );
}
