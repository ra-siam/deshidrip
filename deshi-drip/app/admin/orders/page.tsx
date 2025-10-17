'use client';

import { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Eye, Truck } from 'lucide-react';

// Mock orders data
const mockOrders = [
  {
    id: 'DD001234',
    customer: { name: 'Ahmed Hassan', email: 'ahmed@example.com', phone: '01712345678' },
    items: 3,
    total: 3450,
    payment: { method: 'bKash', status: 'paid', transactionId: 'BK123456' },
    shipping: { provider: 'Pathao', status: 'processing', division: 'Dhaka' },
    status: 'processing',
    createdAt: '2025-10-15',
  },
  {
    id: 'DD001235',
    customer: { name: 'Fatima Khan', email: 'fatima@example.com', phone: '01812345678' },
    items: 2,
    total: 5670,
    payment: { method: 'Nagad', status: 'paid', transactionId: 'NG789012' },
    shipping: { provider: 'RedX', status: 'shipped', division: 'Chittagong' },
    status: 'shipped',
    createdAt: '2025-10-14',
  },
  {
    id: 'DD001236',
    customer: { name: 'Rahim Ali', email: 'rahim@example.com', phone: '01912345678' },
    items: 1,
    total: 2340,
    payment: { method: 'COD', status: 'pending', transactionId: '-' },
    shipping: { provider: 'Steadfast', status: 'delivered', division: 'Sylhet' },
    status: 'delivered',
    createdAt: '2025-10-13',
  },
  {
    id: 'DD001237',
    customer: { name: 'Nadia Islam', email: 'nadia@example.com', phone: '01612345678' },
    items: 4,
    total: 4890,
    payment: { method: 'Card', status: 'paid', transactionId: 'SSL345678' },
    shipping: { provider: 'Pathao', status: 'pending', division: 'Dhaka' },
    status: 'pending',
    createdAt: '2025-10-17',
  },
];

export default function AdminOrdersPage() {
  const [orders] = useState(mockOrders);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = orders.filter(order => 
    filterStatus === 'all' || order.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Orders Management</h1>
        </div>

        {/* Status Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex gap-2 flex-wrap">
            {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-medium transition capitalize ${
                  filterStatus === status
                    ? 'bg-black text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Shipping
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.createdAt}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold">{order.customer.name}</p>
                        <p className="text-sm text-gray-600">{order.customer.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold">{order.items}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold">৳{order.total.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-sm">{order.payment.method}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          order.payment.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {order.payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-sm">{order.shipping.provider}</p>
                        <p className="text-xs text-gray-600">{order.shipping.division}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition">
                          <Truck className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-600">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </div>
    </AdminLayout>
  );
}
