import { NextRequest, NextResponse } from "next/server";
import { getCartByCookieId, getCartCookieId, computeCartSubtotalCents } from "@/lib/cart";
import { getShippingById } from "@/lib/shipping";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { shippingOptionId } = await req.json();
  const shipping = getShippingById(shippingOptionId) ?? null;

  const cookieId = await getCartCookieId();
  const cart = await getCartByCookieId(cookieId);
  if (!cart || cart.items.length === 0) return NextResponse.json({ error: "Cart empty" }, { status: 400 });

  const subtotal = computeCartSubtotalCents(cart.items);
  const total = subtotal + (shipping?.priceCents ?? 0);

  const order = await prisma.order.create({
    data: {
      cookieId: cookieId!,
      totalCents: total,
      shippingLabel: shipping?.label ?? null,
      shippingCents: shipping?.priceCents ?? 0,
      paymentMethod: "cod",
      status: "pending",
      items: {
        create: cart.items.map((it) => ({ nameSnapshot: it.nameSnapshot, priceCents: it.priceCents, quantity: it.quantity })),
      },
    },
    include: { items: true },
  });

  return NextResponse.json({ orderId: order.id, message: "COD order placed. We will contact you for confirmation." });
}
