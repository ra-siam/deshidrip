import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products, weeklyDrops, exclusiveProducts, brandInfo } from '@/data/products';

export default function Home() {
  const featuredProducts = products.filter(p => p.isNewArrival).slice(0, 4);
  const latestDrop = weeklyDrops[0];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600')] bg-cover bg-center opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              DESHI DRIP
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300">
              Exclusive streetwear from the brands that define culture
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/weekly-drops"
                className="bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Shop Weekly Drops
              </Link>
              <Link
                href="/exclusives"
                className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition"
              >
                View Exclusives
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Drop Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-2 md:mb-0">
              <h2 className="text-2xl font-bold">{latestDrop.week}</h2>
              <p className="text-red-100">Released {latestDrop.releaseDate}</p>
            </div>
            <Link
              href="/weekly-drops"
              className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Brands Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Brands</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(brandInfo).map(([key, brand]) => (
              <Link
                key={key}
                href={`/shop?brand=${key}`}
                className="group relative h-64 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                style={{ backgroundColor: brand.color }}
              >
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative h-full flex flex-col justify-center items-center text-center p-6 text-white">
                  <h3 className="text-3xl font-bold mb-2">{brand.name}</h3>
                  <p className="text-sm uppercase tracking-wider mb-3">{brand.tagline}</p>
                  <p className="text-sm opacity-90">{brand.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">New Arrivals</h2>
            <Link href="/shop" className="text-gray-600 hover:text-black transition">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* World Exclusives Preview */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">World Exclusives</h2>
            <p className="text-lg text-yellow-100">
              Limited pieces you won&apos;t find anywhere else
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exclusiveProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/exclusives"
              className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              View All Exclusives
            </Link>
          </div>
        </div>
      </section>

      {/* Bundles Preview */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Complete The Look</h2>
            <p className="text-lg text-gray-400">
              Save big with our curated bundles
            </p>
          </div>
          <div className="text-center">
            <Link
              href="/bundles"
              className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Shop Bundles
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="font-semibold text-lg mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $100</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure transactions</p>
            </div>
            <div>
              <div className="text-4xl mb-4">↩️</div>
              <h3 className="font-semibold text-lg mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
