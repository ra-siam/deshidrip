"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { formatCurrencyFromCents } from "@/lib/currency";

interface CartItemRowProps {
  item: {
    id: string;
    nameSnapshot: string;
    priceCents: number;
    quantity: number;
  };
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const updateQuantity = (newQty: number) => {
    startTransition(async () => {
      setError(null);
      try {
        const res = await fetch("/api/cart", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ itemId: item.id, quantity: newQty }),
        });
        if (!res.ok) throw new Error("Failed to update");
        router.refresh();
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to update";
        setError(msg);
      }
    });
  };

  const removeItem = () => {
    startTransition(async () => {
      setError(null);
      try {
        const res = await fetch(`/api/cart?itemId=${item.id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Failed to remove");
        router.refresh();
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to remove";
        setError(msg);
      }
    });
  };

  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b">
      <div>
        <div className="font-medium">{item.nameSnapshot}</div>
        <div className="text-sm text-zinc-600">{formatCurrencyFromCents(item.priceCents)}</div>
        {error && <div className="text-xs text-red-600">{error}</div>}
      </div>
      <div className="flex items-center gap-2">
        <button disabled={pending || item.quantity <= 1} onClick={() => updateQuantity(item.quantity - 1)} className="border rounded px-2 py-1 text-sm">-</button>
        <div className="w-8 text-center">{item.quantity}</div>
        <button disabled={pending} onClick={() => updateQuantity(item.quantity + 1)} className="border rounded px-2 py-1 text-sm">+</button>
        <button disabled={pending} onClick={removeItem} className="ml-4 text-sm underline">Remove</button>
      </div>
    </div>
  );
}
