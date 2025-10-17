import Link from 'next/link';
import Image from 'next/image';
import { bundles } from '@/data/products';
import { brandInfo } from '@/data/products';

export default function BundlesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Complete The Look</h1>
            <p className="text-xl text-purple-100">
              Curated bundles to save you time and money
            </p>
          </div>
        </div>
      </section>

      {/* Bundles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {bundles.map((bundle) => (
              <div
                key={bundle.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bundle Image */}
                  <div className="relative h-80 md:h-auto">
                    <Image
                      src={bundle.image}
                      alt={bundle.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                      Save ${bundle.savings.toFixed(2)}
                    </div>
                  </div>

                  {/* Bundle Details */}
                  <div className="p-8 flex flex-col justify-between">
                    <div>
                      <h2 className="text-3xl font-bold mb-3">{bundle.name}</h2>
                      <p className="text-gray-600 mb-6">{bundle.description}</p>

                      {/* Products Included */}
                      <div className="mb-6">
                        <h3 className="font-semibold mb-3">Includes:</h3>
                        <ul className="space-y-2">
                          {bundle.products.map((product) => {
                            const brand = brandInfo[product.brand];
                            return (
                              <li key={product.id} className="flex items-start">
                                <span className="mr-2">•</span>
                                <div>
                                  <span className="font-medium">{product.name}</span>
                                  <span
                                    className="ml-2 text-sm"
                                    style={{ color: brand.color }}
                                  >
                                    ({brand.name})
                                  </span>
                                  <span className="text-gray-500 ml-2">
                                    ${product.price.toFixed(2)}
                                  </span>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Pricing */}
                      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600">Regular Price:</span>
                          <span className="text-gray-500 line-through">
                            ${bundle.originalPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-green-600 font-semibold">
                            Bundle Savings:
                          </span>
                          <span className="text-green-600 font-semibold">
                            -${bundle.savings.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <span className="text-xl font-bold">Bundle Price:</span>
                          <span className="text-2xl font-bold">
                            ${bundle.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/shop?brand=${bundle.products[0].brand}`}
                      className="block w-full bg-black text-white text-center py-4 rounded-lg font-semibold hover:bg-gray-800 transition"
                    >
                      Shop Bundle Items
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Buy Bundles?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="font-semibold text-lg mb-2">Save Money</h3>
              <p className="text-gray-600">
                Get up to 20% off compared to buying items separately
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">👔</div>
              <h3 className="font-semibold text-lg mb-2">Perfect Styling</h3>
              <p className="text-gray-600">
                Expertly curated outfits that work perfectly together
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="font-semibold text-lg mb-2">Save Time</h3>
              <p className="text-gray-600">
                No need to mix and match - we&apos;ve done it for you
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
