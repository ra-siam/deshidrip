import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getCartByCookieId, getCartCookieId, computeCartSubtotalCents } from "@/lib/cart";
import { getShippingById } from "@/lib/shipping";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json({ error: "Missing STRIPE_SECRET_KEY" }, { status: 500 });
  }
  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  const { shippingOptionId } = await req.json();
  const shipping = getShippingById(shippingOptionId);

  const cookieId = await getCartCookieId();
  const cart = await getCartByCookieId(cookieId);
  if (!cart || cart.items.length === 0) return NextResponse.json({ error: "Cart empty" }, { status: 400 });

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((it) => ({
    quantity: it.quantity,
    price_data: {
      currency: "usd",
      unit_amount: it.priceCents,
      product_data: { name: it.nameSnapshot },
    },
  }));

  if (shipping) {
    line_items.push({
      quantity: 1,
      price_data: { currency: "usd", unit_amount: shipping.priceCents, product_data: { name: `${shipping.label} Shipping` } },
    });
  }

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    success_url: `${origin}/cart?success=1`,
    cancel_url: `${origin}/cart?canceled=1`,
  });

  return NextResponse.json({ url: session.url });
}
