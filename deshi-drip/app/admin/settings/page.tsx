'use client';

import AdminLayout from '@/components/AdminLayout';
import { Save, Bell, Shield, Truck, CreditCard, Globe } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Store Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Store Settings
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Store Name</label>
                <input
                  type="text"
                  defaultValue="Deshi Drip"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Store Email</label>
                <input
                  type="email"
                  defaultValue="info@deshidrip.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Store Phone</label>
                <input
                  type="tel"
                  defaultValue="+880 1XXX-XXXXXX"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Currency</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
                  <option>BDT (৳)</option>
                  <option>USD ($)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Shipping Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Shipping Providers
            </h2>
            <div className="space-y-3">
              {['Pathao', 'Steadfast', 'RedX', 'Sundarban'].map((provider) => (
                <label key={provider} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-black transition">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div>
                      <p className="font-semibold">{provider} Courier</p>
                      <p className="text-sm text-gray-600">Enable {provider} as shipping option</p>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm font-semibold">
                    Configure
                  </button>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Methods
            </h2>
            <div className="space-y-3">
              {['bKash', 'Nagad', 'Rocket', 'SSL Commerz', 'Cash on Delivery'].map((method) => (
                <label key={method} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-black transition">
                  <div className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked className="w-5 h-5" />
                    <div>
                      <p className="font-semibold">{method}</p>
                      <p className="text-sm text-gray-600">Enable {method} payment</p>
                    </div>
                  </div>
                  <button className="text-blue-600 text-sm font-semibold">
                    Configure
                  </button>
                </label>
              ))}
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>
            <div className="space-y-3">
              {[
                'Email notifications for new orders',
                'Low stock alerts',
                'New customer registration',
                'Weekly sales report',
              ].map((notif) => (
                <label key={notif} className="flex items-center gap-3 p-3">
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                  <span>{notif}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition flex items-center gap-2">
              <Save className="w-5 h-5" />
              Save All Settings
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
