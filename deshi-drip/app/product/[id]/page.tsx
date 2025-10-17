'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { products, brandInfo } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Truck, Shield, RefreshCcw } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === params.id);
  
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/shop" className="text-blue-600 hover:underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  const brand = brandInfo[product.brand];

  const handleAddToCart = () => {
    addToCart({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  // Related products (same brand)
  const relatedProducts = products
    .filter(p => p.brand === product.brand && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-black">Home</Link>
          {' / '}
          <Link href="/shop" className="hover:text-black">Shop</Link>
          {' / '}
          <Link href={`/shop?brand=${product.brand}`} className="hover:text-black">
            {brand.name}
          </Link>
          {' / '}
          <span className="text-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="relative aspect-square bg-white rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.isExclusive && (
                <span className="absolute top-4 left-4 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  WORLD EXCLUSIVE
                </span>
              )}
              {product.isWeeklyDrop && (
                <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  WEEKLY DROP
                </span>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-black' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              style={{ color: brand.color }}
            >
              {brand.name}
            </p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                    SALE
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Size</label>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg transition ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Color</label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg transition ${
                      selectedColor === color
                        ? 'bg-black text-white border-black'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:border-black transition"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-10 h-10 border border-gray-300 rounded-lg hover:border-black transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Stock Status */}
            {product.stock < 20 && (
              <p className="text-red-600 font-semibold mb-4">
                Only {product.stock} left in stock - Order soon!
              </p>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition ${
                addedToCart
                  ? 'bg-green-600 text-white'
                  : product.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {addedToCart ? 'Added to Cart!' : product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>

            {addedToCart && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => router.push('/cart')}
                  className="flex-1 py-2 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition"
                >
                  View Cart
                </button>
                <button
                  onClick={() => router.push('/checkout')}
                  className="flex-1 py-2 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Checkout
                </button>
              </div>
            )}

            {/* Features */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 mt-1 text-gray-600" />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCcw className="w-5 h-5 mt-1 text-gray-600" />
                <div>
                  <p className="font-semibold">Easy Returns</p>
                  <p className="text-sm text-gray-600">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 mt-1 text-gray-600" />
                <div>
                  <p className="font-semibold">Authentic Guarantee</p>
                  <p className="text-sm text-gray-600">100% genuine products</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-8">
            <h2 className="text-2xl font-bold mb-6">More from {brand.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Image
                        src={p.images[0]}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {p.name}
                      </h3>
                      <span className="text-lg font-bold">
                        ${p.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
