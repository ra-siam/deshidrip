'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import { brandInfo } from '@/data/products';
import { 
  shippingProviders, 
  bangladeshDivisions, 
  calculateShipping 
} from '@/lib/shipping';
import { 
  paymentMethods, 
  calculatePaymentFee 
} from '@/lib/payment';
import { CreditCard, Lock, Truck, MapPin } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    division: 'Dhaka',
    district: '',
    area: '',
    address: '',
  });

  const [selectedShipping, setSelectedShipping] = useState(shippingProviders[0].id);
  const [selectedPayment, setSelectedPayment] = useState('bkash');
  const [paymentDetails, setPaymentDetails] = useState({
    mobileNumber: '',
    transactionId: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  const selectedShippingProvider = shippingProviders.find(p => p.id === selectedShipping);
  const shippingCost = selectedShippingProvider 
    ? calculateShipping(selectedShippingProvider, formData.division)
    : 0;
  
  const paymentFee = calculatePaymentFee(cartTotal + shippingCost, selectedPayment);
  const total = cartTotal + shippingCost + paymentFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      // In production, save order to database
      const order = {
        id: 'DD' + Date.now(),
        items: cart,
        customer: formData,
        shipping: {
          provider: selectedShipping,
          cost: shippingCost,
        },
        payment: {
          method: selectedPayment,
          fee: paymentFee,
          details: paymentDetails,
        },
        total: total,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      
      console.log('Order placed:', order);
      localStorage.setItem('lastOrder', JSON.stringify(order));
      clearCart();
      router.push('/order-confirmation');
    }, 2000);
  };

  const selectedPaymentMethod = paymentMethods.find(m => m.id === selectedPayment);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Division *</label>
                    <select
                      name="division"
                      required
                      value={formData.division}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      {bangladeshDivisions.map(div => (
                        <option key={div} value={div}>{div}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">District *</label>
                    <input
                      type="text"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Area/Thana *</label>
                    <input
                      type="text"
                      name="area"
                      required
                      value={formData.area}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Address *</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House, Road, etc."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Shipping Method</h2>
                <div className="space-y-3">
                  {shippingProviders.map((provider) => {
                    const cost = calculateShipping(provider, formData.division);
                    return (
                      <label
                        key={provider.id}
                        className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                          selectedShipping === provider.id
                            ? 'border-black bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="shipping"
                          value={provider.id}
                          checked={selectedShipping === provider.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{provider.logo}</span>
                            <span className="font-semibold">{provider.name}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{provider.description}</p>
                          <p className="text-xs text-gray-500">Delivery: {provider.deliveryTime}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">৳{cost}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Method
                </h2>
                <div className="space-y-3 mb-6">
                  {paymentMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`flex items-start gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                        selectedPayment === method.id
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={selectedPayment === method.id}
                        onChange={(e) => setSelectedPayment(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{method.logo}</span>
                          <span className="font-semibold">{method.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">{method.description}</p>
                        {method.fee > 0 && (
                          <p className="text-xs text-gray-500 mt-1">
                            +{method.fee}% transaction fee
                          </p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>

                {/* Payment Details */}
                {selectedPaymentMethod && selectedPaymentMethod.type === 'mobile_banking' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold">Payment Instructions</h3>
                    <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                      <li>Go to your {selectedPaymentMethod.name} app</li>
                      <li>Send ৳{total.toFixed(2)} to: <strong>01XXXXXXXXX</strong></li>
                      <li>Enter the transaction ID below</li>
                    </ol>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Mobile Number (Your {selectedPaymentMethod.name} Number)
                      </label>
                      <input
                        type="tel"
                        name="mobileNumber"
                        required
                        value={paymentDetails.mobileNumber}
                        onChange={handlePaymentDetailsChange}
                        placeholder="01XXXXXXXXX"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Transaction ID *
                      </label>
                      <input
                        type="text"
                        name="transactionId"
                        required
                        value={paymentDetails.transactionId}
                        onChange={handlePaymentDetailsChange}
                        placeholder="Enter transaction ID from SMS"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                  </div>
                )}

                {selectedPaymentMethod && selectedPaymentMethod.type === 'card' && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number *</label>
                      <input
                        type="text"
                        name="cardNumber"
                        required
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentDetailsChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Name on Card *</label>
                      <input
                        type="text"
                        name="cardName"
                        required
                        value={paymentDetails.cardName}
                        onChange={handlePaymentDetailsChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry *</label>
                        <input
                          type="text"
                          name="expiryDate"
                          required
                          value={paymentDetails.expiryDate}
                          onChange={handlePaymentDetailsChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV *</label>
                        <input
                          type="text"
                          name="cvv"
                          required
                          value={paymentDetails.cvv}
                          onChange={handlePaymentDetailsChange}
                          placeholder="123"
                          maxLength={4}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedPaymentMethod && selectedPaymentMethod.type === 'cod' && (
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-gray-700">
                      💵 <strong>Cash on Delivery:</strong> Pay when you receive your order. 
                      Please keep exact amount ready.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                  {cart.map((item) => {
                    const brand = brandInfo[item.product.brand];
                    return (
                      <div
                        key={`${item.product.id}-${item.size}-${item.color}`}
                        className="flex gap-3"
                      >
                        <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 text-sm">
                          <p className="font-semibold">{item.product.name}</p>
                          <p className="text-xs" style={{ color: brand.color }}>
                            {brand.name}
                          </p>
                          <p className="text-gray-600">
                            {item.size} / {item.color} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ৳{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pricing */}
                <div className="space-y-2 mb-6 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">৳{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping ({selectedShippingProvider?.name})</span>
                    <span className="font-semibold">৳{shippingCost.toFixed(2)}</span>
                  </div>
                  {paymentFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Payment Fee ({selectedPaymentMethod?.fee}%)</span>
                      <span className="font-semibold">৳{paymentFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">৳{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-lg font-semibold transition ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {isProcessing ? 'Processing...' : `Place Order - ৳${total.toFixed(2)}`}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  <Lock className="w-3 h-3 inline mr-1" />
                  Secure checkout
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
