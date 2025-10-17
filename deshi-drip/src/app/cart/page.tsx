import { computeCartSubtotalCents, getCartByCookieId, getCartCookieId } from "@/lib/cart";
import CartItemRow from "@/components/CartItemRow";
import { formatCurrencyFromCents } from "@/lib/currency";
import Link from "next/link";
import PlaceOrder from "./place-order";
import ShippingSelector from "./shipping-selector";

export default async function CartPage() {
  const cookieId = await getCartCookieId();
  const cart = await getCartByCookieId(cookieId);

  const items = cart?.items ?? [];
  const subtotal = computeCartSubtotalCents(items);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Cart</h1>
      {items.length === 0 ? (
        <div className="text-zinc-600">
          Your cart is empty. <Link href="/" className="underline">Continue shopping</Link>.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}
          </div>
          <div className="border rounded-lg p-4 space-y-4 h-fit">
            <div className="flex items-center justify-between">
              <div className="text-sm text-zinc-600">Subtotal</div>
              <div className="font-medium">{formatCurrencyFromCents(subtotal)}</div>
            </div>
            <ShippingSelector />
            <PlaceOrder />
          </div>
        </div>
      )}
    </div>
  );
}
