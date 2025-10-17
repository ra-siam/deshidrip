export type ShippingOptionId = "standard" | "express";

export type ShippingOption = {
  id: ShippingOptionId;
  label: string;
  priceCents: number;
  eta: string;
};

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "standard", label: "Inside Dhaka (2-3 days)", priceCents: 8000, eta: "2-3 days" },
  { id: "express", label: "Outside Dhaka (3-7 days)", priceCents: 12000, eta: "3-7 days" },
];

export function getShippingById(id: string | null | undefined): ShippingOption | null {
  if (!id) return null;
  return SHIPPING_OPTIONS.find(o => o.id === id) ?? null;
}
