export type ShippingOptionId = "standard" | "express";

export type ShippingOption = {
  id: ShippingOptionId;
  label: string;
  priceCents: number;
  eta: string;
};

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: "standard", label: "Standard (3-7 days)", priceCents: 500, eta: "3-7 business days" },
  { id: "express", label: "Express (1-3 days)", priceCents: 1500, eta: "1-3 business days" },
];

export function getShippingById(id: string | null | undefined): ShippingOption | null {
  if (!id) return null;
  return SHIPPING_OPTIONS.find(o => o.id === id) ?? null;
}
