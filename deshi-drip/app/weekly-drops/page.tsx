import ProductCard from '@/components/ProductCard';
import { weeklyDrops } from '@/data/products';

export default function WeeklyDropsPage() {
  const currentDrop = weeklyDrops[0];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">{currentDrop.week}</h1>
            <p className="text-xl text-red-100 mb-2">
              Released: {currentDrop.releaseDate}
            </p>
            <p className="text-lg">
              Fresh drops every week. Limited quantities available.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">This Week&apos;s Drops</h2>
            <p className="text-gray-600">
              {currentDrop.products.length} exclusive items available now
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentDrop.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">📅</div>
              <h3 className="font-semibold text-lg mb-2">Weekly Updates</h3>
              <p className="text-gray-600">New drops every Friday at 10 AM</p>
            </div>
            <div>
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Limited Stock</h3>
              <p className="text-gray-600">Exclusive quantities sell out fast</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="font-semibold text-lg mb-2">Member Priority</h3>
              <p className="text-gray-600">Sign up for early access</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
