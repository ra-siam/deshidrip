"use client";

import { useState, useTransition } from "react";

interface AddToCartButtonProps {
  productId?: string;
  variantId?: string;
  bundleId?: string;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({ productId, variantId, bundleId, quantity = 1, className }: AddToCartButtonProps) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const canSubmit = Boolean(productId || variantId || bundleId);

  const handleClick = () => {
    if (!canSubmit) return;
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, variantId, bundleId, quantity }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || `Failed with ${res.status}`);
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to add to cart";
        setError(msg);
      }
    });
  };

  return (
    <div className={className}>
      <button
        disabled={!canSubmit || pending}
        onClick={handleClick}
        className="w-full rounded-md bg-black text-white py-2 px-3 text-sm disabled:opacity-50"
      >
        {pending ? "Adding…" : "Add to cart"}
      </button>
      {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
    </div>
  );
}
