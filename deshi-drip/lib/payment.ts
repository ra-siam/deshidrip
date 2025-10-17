// Bangladesh Payment Integration
export interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  description: string;
  type: 'mobile_banking' | 'card' | 'cod';
  enabled: boolean;
  fee: number; // percentage
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'bkash',
    name: 'bKash',
    logo: '💰',
    description: 'Pay with bKash mobile banking',
    type: 'mobile_banking',
    enabled: true,
    fee: 1.5, // 1.5% transaction fee
  },
  {
    id: 'nagad',
    name: 'Nagad',
    logo: '💸',
    description: 'Pay with Nagad mobile banking',
    type: 'mobile_banking',
    enabled: true,
    fee: 1.0,
  },
  {
    id: 'rocket',
    name: 'Rocket',
    logo: '🚀',
    description: 'Pay with Dutch-Bangla Rocket',
    type: 'mobile_banking',
    enabled: true,
    fee: 1.5,
  },
  {
    id: 'sslcommerz',
    name: 'Card Payment',
    logo: '💳',
    description: 'Visa, Mastercard, Amex via SSLCommerz',
    type: 'card',
    enabled: true,
    fee: 2.5,
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    logo: '💵',
    description: 'Pay when you receive your order',
    type: 'cod',
    enabled: true,
    fee: 0,
  },
];

export interface PaymentDetails {
  method: string;
  accountNumber?: string;
  transactionId?: string;
  amount: number;
}

export function calculatePaymentFee(amount: number, methodId: string): number {
  const method = paymentMethods.find(m => m.id === methodId);
  if (!method) return 0;
  return (amount * method.fee) / 100;
}

export function getEnabledPaymentMethods(): PaymentMethod[] {
  return paymentMethods.filter(m => m.enabled);
}

// Mock payment processing functions (integrate with real APIs in production)
export async function processBkashPayment(
  amount: number,
  phone: string
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: 'BK' + Date.now(),
      });
    }, 2000);
  });
}

export async function processNagadPayment(
  amount: number,
  phone: string
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: 'NG' + Date.now(),
      });
    }, 2000);
  });
}

export async function processSSLCommerzPayment(
  amount: number,
  cardDetails: { cardNumber: string; cardName: string; expiryDate: string; cvv: string }
): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  // Mock implementation
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: 'SSL' + Date.now(),
      });
    }, 2000);
  });
}
