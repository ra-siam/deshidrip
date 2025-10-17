'use client';

import AdminLayout from '@/components/AdminLayout';
import { Package, ShoppingBag, DollarSign, Users, TrendingUp, TrendingDown } from 'lucide-react';
import { products } from '@/data/products';

export default function AdminDashboardPage() {
  // Mock data - replace with real data from API
  const stats = [
    {
      name: 'Total Products',
      value: products.length,
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Orders',
      value: '156',
      change: '+23%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-green-500',
    },
    {
      name: 'Revenue',
      value: '৳2,45,680',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
    {
      name: 'Customers',
      value: '892',
      change: '-5%',
      trend: 'down',
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

  const recentOrders = [
    { id: 'DD001234', customer: 'Ahmed Hassan', amount: '৳3,450', status: 'Processing' },
    { id: 'DD001235', customer: 'Fatima Khan', amount: '৳5,670', status: 'Shipped' },
    { id: 'DD001236', customer: 'Rahim Ali', amount: '৳2,340', status: 'Delivered' },
    { id: 'DD001237', customer: 'Nadia Islam', amount: '৳4,890', status: 'Pending' },
  ];

  const lowStockProducts = products.filter(p => p.stock < 20).slice(0, 5);

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="font-semibold">{stat.change}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.name}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{order.amount}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Low Stock Alert</h2>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
                >
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-red-600">{product.stock} left</p>
                    <p className="text-xs text-gray-600">{product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
