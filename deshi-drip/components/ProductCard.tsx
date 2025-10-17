import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { brandInfo } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const brand = brandInfo[product.brand];

  return (
    <Link href={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {product.isExclusive && (
            <span className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-full">
              EXCLUSIVE
            </span>
          )}
          {product.isWeeklyDrop && (
            <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              WEEKLY DROP
            </span>
          )}
          {product.isNewArrival && !product.isWeeklyDrop && (
            <span className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: brand.color }}>
            {brand.name}
          </p>
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-600 transition">
            {product.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.stock < 20 && (
            <p className="text-xs text-red-600 mt-2">
              Only {product.stock} left in stock!
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
