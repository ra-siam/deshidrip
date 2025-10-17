"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { SHIPPING_OPTIONS } from "@/lib/shipping";

export default function ShippingSelector() {
  const router = useRouter();
  const params = useSearchParams();
  const current = params.get("shipping") ?? "standard";

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const url = new URL(window.location.href);
    if (e.target.value) url.searchParams.set("shipping", e.target.value);
    else url.searchParams.delete("shipping");
    router.push(url.toString());
  };

  return (
    <div className="space-y-1">
      <div className="text-sm text-zinc-600">Shipping</div>
      <select className="w-full border rounded px-3 py-2 text-sm" defaultValue={current} onChange={onChange}>
        {SHIPPING_OPTIONS.map(o => (
          <option key={o.id} value={o.id}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
