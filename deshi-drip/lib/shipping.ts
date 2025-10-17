// Bangladesh Shipping Integration
export interface ShippingProvider {
  id: string;
  name: string;
  logo: string;
  description: string;
  deliveryTime: string;
  insideDhaka: number;
  outsideDhaka: number;
  zones: string[];
}

export const shippingProviders: ShippingProvider[] = [
  {
    id: 'pathao',
    name: 'Pathao Courier',
    logo: '📦',
    description: 'Fast and reliable delivery across Bangladesh',
    deliveryTime: '2-3 business days',
    insideDhaka: 60,
    outsideDhaka: 120,
    zones: ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal'],
  },
  {
    id: 'steadfast',
    name: 'Steadfast Courier',
    logo: '🚚',
    description: 'Nationwide delivery service',
    deliveryTime: '3-5 business days',
    insideDhaka: 50,
    outsideDhaka: 100,
    zones: ['All Bangladesh'],
  },
  {
    id: 'redx',
    name: 'RedX',
    logo: '🏃',
    description: 'Express delivery service',
    deliveryTime: '1-2 business days',
    insideDhaka: 70,
    outsideDhaka: 130,
    zones: ['Major Cities'],
  },
  {
    id: 'sundarban',
    name: 'Sundarban Courier',
    logo: '🌴',
    description: 'Affordable nationwide coverage',
    deliveryTime: '4-6 business days',
    insideDhaka: 45,
    outsideDhaka: 90,
    zones: ['All Bangladesh'],
  },
];

export interface ShippingAddress {
  division: string;
  district: string;
  area: string;
  address: string;
  phone: string;
}

export const bangladeshDivisions = [
  'Dhaka',
  'Chittagong',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Sylhet',
  'Rangpur',
  'Mymensingh',
];

export function calculateShipping(
  provider: ShippingProvider,
  division: string
): number {
  return division === 'Dhaka' ? provider.insideDhaka : provider.outsideDhaka;
}

export function getAvailableProviders(division: string): ShippingProvider[] {
  return shippingProviders.filter(provider => {
    if (provider.zones.includes('All Bangladesh')) return true;
    return provider.zones.includes(division);
  });
}
