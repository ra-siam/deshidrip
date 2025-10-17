import ProductCard from '@/components/ProductCard';
import { exclusiveProducts } from '@/data/products';

export default function ExclusivesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">World Exclusives</h1>
            <p className="text-xl text-yellow-100">
              Limited edition pieces you won&apos;t find anywhere else
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Exclusive Collection</h2>
            <p className="text-gray-600">
              {exclusiveProducts.length} world exclusive items available
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {exclusiveProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Makes Them Exclusive?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-semibold text-lg mb-2">Global Exclusivity</h3>
              <p className="text-gray-600">
                Only available at Deshi Drip worldwide
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-semibold text-lg mb-2">Limited Production</h3>
              <p className="text-gray-600">
                Small batch manufacturing for true rarity
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-semibold text-lg mb-2">Unique Designs</h3>
              <p className="text-gray-600">
                Custom colorways and special collaborations
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
