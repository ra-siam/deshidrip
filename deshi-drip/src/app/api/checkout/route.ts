import { NextResponse } from "next/server";
import { getCartByCookieId, getCartCookieId, computeCartSubtotalCents } from "@/lib/cart";

export async function POST() {
  const cookieId = await getCartCookieId();
  const cart = await getCartByCookieId(cookieId);
  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const subtotal = computeCartSubtotalCents(cart.items);
  // Mock order id
  const orderId = `ORDER-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  return NextResponse.json({ orderId, subtotalCents: subtotal, message: "Order placed (mock)." });
}
