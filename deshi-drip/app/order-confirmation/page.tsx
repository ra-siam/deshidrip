import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
          
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully placed
            and will be shipped soon.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-xl font-bold">
              #DD{Math.floor(Math.random() * 1000000)}
            </p>
          </div>

          <p className="text-sm text-gray-600 mb-6">
            A confirmation email has been sent to your email address with your
            order details and tracking information.
          </p>

          <div className="space-y-3">
            <Link
              href="/shop"
              className="block w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="block w-full border-2 border-gray-300 py-3 rounded-lg font-semibold hover:border-black transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
