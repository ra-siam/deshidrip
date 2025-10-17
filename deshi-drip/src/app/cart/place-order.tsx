"use client";

import { useState, useTransition } from "react";

export default function PlaceOrder() {
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const placeOrder = () => {
    setError(null);
    setMessage(null);
    startTransition(async () => {
      try {
        const url = new URL(window.location.href);
        const shippingOptionId = url.searchParams.get("shipping");
        const res = await fetch("/api/checkout/stripe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ shippingOptionId }) });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to checkout");
        if (data.url) {
          window.location.href = data.url;
        } else {
          setMessage("Checkout created");
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Failed to checkout";
        setError(msg);
      }
    });
  };

  return (
    <div>
      <button onClick={placeOrder} disabled={pending} className="w-full rounded-md bg-black text-white py-2 px-3 text-sm">
        {pending ? "Placing order…" : "Checkout"}
      </button>
      {message && <div className="text-xs text-green-700 mt-2">{message}</div>}
      {error && <div className="text-xs text-red-600 mt-2">{error}</div>}
    </div>
  );
}
