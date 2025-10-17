'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingBag } from 'lucide-react';
import { brandInfo } from '@/data/products';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-20 h-20 mx-auto mb-4 text-gray-400" />
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Start shopping to add items to your cart
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cartCount} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const brand = brandInfo[item.product.brand];
              return (
                <div
                  key={`${item.product.id}-${item.size}-${item.color}`}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p
                            className="text-xs font-semibold uppercase tracking-wider mb-1"
                            style={{ color: brand.color }}
                          >
                            {brand.name}
                          </p>
                          <Link
                            href={`/product/${item.product.id}`}
                            className="text-lg font-semibold hover:underline"
                          >
                            {item.product.name}
                          </Link>
                        </div>
                        <button
                          onClick={() =>
                            removeFromCart(item.product.id, item.size, item.color)
                          }
                          className="text-red-600 hover:text-red-700 transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="text-sm text-gray-600 mb-4">
                        <p>Size: {item.size}</p>
                        <p>Color: {item.color}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Selector */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity - 1
                              )
                            }
                            className="w-8 h-8 border border-gray-300 rounded hover:border-black transition"
                          >
                            -
                          </button>
                          <span className="font-semibold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                            className="w-8 h-8 border border-gray-300 rounded hover:border-black transition"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-lg font-bold">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">
                            ${item.product.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {cartTotal >= 100 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${(10).toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">
                    ${(cartTotal + (cartTotal >= 100 ? 0 : 10)).toFixed(2)}
                  </span>
                </div>
              </div>

              {cartTotal < 100 && (
                <p className="text-sm text-gray-600 mb-4 p-3 bg-yellow-50 rounded">
                  Add ${(100 - cartTotal).toFixed(2)} more for free shipping!
                </p>
              )}

              <Link
                href="/checkout"
                className="block w-full bg-black text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-800 transition mb-3"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/shop"
                className="block w-full border-2 border-gray-300 text-center py-3 rounded-lg font-semibold hover:border-black transition"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span>🚚</span>
                  <span>Free shipping on orders over $100</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>🔒</span>
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-start gap-2">
                  <span>↩️</span>
                  <span>30-day easy returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
