'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { Menu, X, ShoppingBag, Search, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="bg-black text-white sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-wider">
            DESHI DRIP
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/weekly-drops" className="hover:text-gray-300 transition">
              Weekly Drops
            </Link>
            <Link href="/bundles" className="hover:text-gray-300 transition">
              Bundles
            </Link>
            <Link href="/bundle-builder" className="hover:text-gray-300 transition flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Bundle Builder
            </Link>
            <Link href="/exclusives" className="hover:text-gray-300 transition">
              World Exclusives
            </Link>
            <Link href="/shop" className="hover:text-gray-300 transition">
              Shop All
            </Link>
            
            {/* Brands Dropdown */}
            <div className="relative group">
              <button className="hover:text-gray-300 transition">
                Brands
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-black border border-gray-800 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/shop?brand=zeroone" className="block px-4 py-3 hover:bg-gray-900">
                  ZeroOne
                </Link>
                <Link href="/shop?brand=zerotwo" className="block px-4 py-3 hover:bg-gray-900">
                  ZeroTwo
                </Link>
                <Link href="/shop?brand=zerothree" className="block px-4 py-3 hover:bg-gray-900">
                  ZeroThree
                </Link>
                <Link href="/shop?brand=zerofour" className="block px-4 py-3 hover:bg-gray-900">
                  ZeroFour
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-300 transition">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/cart" className="relative hover:text-gray-300 transition">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href="/weekly-drops"
              className="block py-2 hover:text-gray-300 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Weekly Drops
            </Link>
            <Link
              href="/bundles"
              className="block py-2 hover:text-gray-300 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Bundles
            </Link>
            <Link
              href="/bundle-builder"
              className="block py-2 hover:text-gray-300 transition flex items-center gap-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <Sparkles className="w-4 h-4" />
              Bundle Builder
            </Link>
            <Link
              href="/exclusives"
              className="block py-2 hover:text-gray-300 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              World Exclusives
            </Link>
            <Link
              href="/shop"
              className="block py-2 hover:text-gray-300 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop All
            </Link>
            <div className="pt-2 border-t border-gray-800">
              <p className="text-gray-400 text-sm mb-2">Brands</p>
              <Link
                href="/shop?brand=zeroone"
                className="block py-2 pl-4 hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                ZeroOne
              </Link>
              <Link
                href="/shop?brand=zerotwo"
                className="block py-2 pl-4 hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                ZeroTwo
              </Link>
              <Link
                href="/shop?brand=zerothree"
                className="block py-2 pl-4 hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                ZeroThree
              </Link>
              <Link
                href="/shop?brand=zerofour"
                className="block py-2 pl-4 hover:text-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                ZeroFour
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
