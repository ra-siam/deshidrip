'use client';

import AdminLayout from '@/components/AdminLayout';
import { BarChart3, TrendingUp, Users, Package } from 'lucide-react';

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Analytics & Reports</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
            <TrendingUp className="w-8 h-8 mb-4" />
            <p className="text-sm opacity-90 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold">৳2,45,680</p>
            <p className="text-sm mt-2 opacity-75">+18% from last month</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
            <Package className="w-8 h-8 mb-4" />
            <p className="text-sm opacity-90 mb-1">Orders</p>
            <p className="text-3xl font-bold">156</p>
            <p className="text-sm mt-2 opacity-75">+23% from last month</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
            <Users className="w-8 h-8 mb-4" />
            <p className="text-sm opacity-90 mb-1">Customers</p>
            <p className="text-3xl font-bold">892</p>
            <p className="text-sm mt-2 opacity-75">+12% from last month</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg shadow-lg p-6">
            <BarChart3 className="w-8 h-8 mb-4" />
            <p className="text-sm opacity-90 mb-1">Avg. Order</p>
            <p className="text-3xl font-bold">৳1,575</p>
            <p className="text-sm mt-2 opacity-75">+5% from last month</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Sales by Brand</h2>
            <div className="space-y-4">
              {[
                { name: 'ZeroOne', sales: 45, color: 'bg-red-500' },
                { name: 'ZeroTwo', sales: 30, color: 'bg-teal-500' },
                { name: 'ZeroThree', sales: 15, color: 'bg-blue-500' },
                { name: 'ZeroFour', sales: 10, color: 'bg-green-500' },
              ].map((brand) => (
                <div key={brand.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-semibold">{brand.name}</span>
                    <span className="text-gray-600">{brand.sales}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${brand.color} h-3 rounded-full transition-all`}
                      style={{ width: `${brand.sales}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Top Selling Products</h2>
            <div className="space-y-3">
              {[
                { name: 'Urban Legend Hoodie', sales: 45, revenue: '৳40,455' },
                { name: 'Essence Crewneck', sales: 38, revenue: '৳37,996' },
                { name: 'Velocity Track Jacket', sales: 32, revenue: '৳35,197' },
                { name: 'Noir Statement Jacket', sales: 28, revenue: '৳53,197' },
                { name: 'Zenith Trench Coat', sales: 25, revenue: '৳62,498' },
              ].map((product, index) => (
                <div key={product.name} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{product.name}</p>
                    <p className="text-xs text-gray-600">{product.sales} sold</p>
                  </div>
                  <p className="font-bold">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment & Shipping Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Payment Methods</h2>
            <div className="space-y-3">
              {[
                { method: 'bKash', percent: 40, amount: '৳98,272' },
                { method: 'Cash on Delivery', percent: 30, amount: '৳73,704' },
                { method: 'Nagad', percent: 20, amount: '৳49,136' },
                { method: 'Card Payment', percent: 10, amount: '৳24,568' },
              ].map((payment) => (
                <div key={payment.method} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{payment.method}</p>
                    <p className="text-sm text-gray-600">{payment.percent}% of orders</p>
                  </div>
                  <p className="font-bold">{payment.amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Shipping by Region</h2>
            <div className="space-y-3">
              {[
                { region: 'Dhaka', orders: 89, percent: 57 },
                { region: 'Chittagong', orders: 35, percent: 22 },
                { region: 'Sylhet', orders: 18, percent: 12 },
                { region: 'Others', orders: 14, percent: 9 },
              ].map((region) => (
                <div key={region.region} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{region.region}</p>
                    <p className="text-sm text-gray-600">{region.orders} orders</p>
                  </div>
                  <p className="font-bold">{region.percent}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
