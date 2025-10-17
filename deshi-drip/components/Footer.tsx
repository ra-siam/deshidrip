import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">DESHI DRIP</h3>
            <p className="text-gray-400">
              Your destination for exclusive streetwear from emerging brands.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-gray-400 hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/weekly-drops" className="text-gray-400 hover:text-white transition">
                  Weekly Drops
                </Link>
              </li>
              <li>
                <Link href="/bundles" className="text-gray-400 hover:text-white transition">
                  Bundles
                </Link>
              </li>
              <li>
                <Link href="/exclusives" className="text-gray-400 hover:text-white transition">
                  World Exclusives
                </Link>
              </li>
            </ul>
          </div>

          {/* Brands */}
          <div>
            <h4 className="font-semibold mb-4">Brands</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?brand=zeroone" className="text-gray-400 hover:text-white transition">
                  ZeroOne
                </Link>
              </li>
              <li>
                <Link href="/shop?brand=zerotwo" className="text-gray-400 hover:text-white transition">
                  ZeroTwo
                </Link>
              </li>
              <li>
                <Link href="/shop?brand=zerothree" className="text-gray-400 hover:text-white transition">
                  ZeroThree
                </Link>
              </li>
              <li>
                <Link href="/shop?brand=zerofour" className="text-gray-400 hover:text-white transition">
                  ZeroFour
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Deshi Drip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
