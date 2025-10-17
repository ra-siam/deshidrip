'use client';

import { useState } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import { bundles as initialBundles } from '@/data/products';
import { Edit, Trash2, Plus, Eye } from 'lucide-react';

export default function AdminBundlesPage() {
  const [bundles] = useState(initialBundles);

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Bundles Management</h1>
          <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Bundle
          </button>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bundles.map((bundle) => (
            <div key={bundle.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 bg-gray-100">
                <Image
                  src={bundle.image}
                  alt={bundle.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Save ৳{bundle.savings.toFixed(2)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{bundle.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{bundle.description}</p>
                
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Includes {bundle.products.length} products:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    {bundle.products.map((product) => (
                      <li key={product.id}>• {product.name}</li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Regular Price</p>
                    <p className="text-lg font-bold line-through text-gray-500">
                      ৳{bundle.originalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Bundle Price</p>
                    <p className="text-2xl font-bold text-green-600">
                      ৳{bundle.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
