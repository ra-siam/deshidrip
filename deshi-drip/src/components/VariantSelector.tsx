"use client";

import { useMemo, useState } from "react";
import AddToCartButton from "@/components/AddToCartButton";
import { formatCurrencyFromCents } from "@/lib/currency";

export interface VariantLike {
  id: string;
  size: string | null;
  color: string | null;
  priceCents: number | null;
}

interface VariantSelectorProps {
  productId: string;
  basePriceCents: number;
  variants: VariantLike[];
}

export default function VariantSelector({ productId, basePriceCents, variants }: VariantSelectorProps) {
  const colors = useMemo(() => Array.from(new Set(variants.map(v => v.color).filter(Boolean))) as string[], [variants]);
  const sizes = useMemo(() => Array.from(new Set(variants.map(v => v.size).filter(Boolean))) as string[], [variants]);

  const [selectedColor, setSelectedColor] = useState<string | null>(colors[0] ?? null);
  const [selectedSize, setSelectedSize] = useState<string | null>(sizes[0] ?? null);

  const selectedVariant = useMemo(() => {
    return variants.find(v => (selectedColor ? v.color === selectedColor : true) && (selectedSize ? v.size === selectedSize : true)) || null;
  }, [variants, selectedColor, selectedSize]);

  const displayPrice = selectedVariant?.priceCents ?? basePriceCents;

  return (
    <div className="space-y-4">
      {colors.length > 0 && (
        <div className="space-y-1">
          <div className="text-sm text-zinc-600">Color</div>
          <select
            className="w-full border rounded-md p-2 text-sm"
            value={selectedColor ?? ""}
            onChange={(e) => setSelectedColor(e.target.value || null)}
          >
            {colors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      {sizes.length > 0 && (
        <div className="space-y-1">
          <div className="text-sm text-zinc-600">Size</div>
          <select
            className="w-full border rounded-md p-2 text-sm"
            value={selectedSize ?? ""}
            onChange={(e) => setSelectedSize(e.target.value || null)}
          >
            {sizes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      <div className="text-lg font-semibold">{formatCurrencyFromCents(displayPrice)}</div>

      <AddToCartButton
        productId={!selectedVariant ? productId : undefined}
        variantId={selectedVariant?.id ?? undefined}
        className="mt-2"
      />
    </div>
  );
}
