import { NextRequest, NextResponse } from "next/server";
import { ensureCartAndSetCookie, getCartByCookieId, getCartCookieId } from "@/lib/cart";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieId = await getCartCookieId();
  const cart = await getCartByCookieId(cookieId);
  return NextResponse.json(cart ?? { id: null, items: [] });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productId, variantId, bundleId, quantity = 1 } = body ?? {};
  if (!productId && !variantId && !bundleId) {
    return NextResponse.json({ error: "Missing productId, variantId or bundleId" }, { status: 400 });
  }

  const cart = await ensureCartAndSetCookie();

  // Compute price and name snapshot
  let priceCents = 0;
  let nameSnapshot = "";

  if (bundleId) {
    const bundle = await prisma.bundle.findUnique({ where: { id: bundleId } });
    if (!bundle) return NextResponse.json({ error: "Bundle not found" }, { status: 404 });
    priceCents = bundle.bundlePriceCents;
    nameSnapshot = bundle.title;
  } else if (variantId) {
    const variant = await prisma.productVariant.findUnique({ where: { id: variantId }, include: { product: true } });
    if (!variant || !variant.product) return NextResponse.json({ error: "Variant not found" }, { status: 404 });
    priceCents = variant.priceCents ?? variant.product.basePriceCents;
    nameSnapshot = `${variant.product.name} - ${variant.color ?? ''} ${variant.size ?? ''}`.trim();
  } else if (productId) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
    priceCents = product.basePriceCents;
    nameSnapshot = product.name;
  }

  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId: productId ?? null,
      variantId: variantId ?? null,
      bundleId: bundleId ?? null,
      quantity: Math.max(1, Number(quantity) || 1),
      priceCents,
      nameSnapshot,
    },
  });

  const updated = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: { items: { include: { product: true, variant: true, bundle: true } } },
  });

  return NextResponse.json(updated);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { itemId, quantity } = body ?? {};
  if (!itemId || typeof quantity !== "number") {
    return NextResponse.json({ error: "Missing itemId or quantity" }, { status: 400 });
  }

  const cookieId = await getCartCookieId();
  const cart = await getCartByCookieId(cookieId);
  if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });

  const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
  if (!item || item.cartId !== cart.id) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  const updated = await prisma.cartItem.update({ where: { id: itemId }, data: { quantity: Math.max(0, quantity) } });
  if (updated.quantity === 0) {
    await prisma.cartItem.delete({ where: { id: itemId } });
  }

  const refreshed = await getCartByCookieId(cookieId);
  return NextResponse.json(refreshed);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("itemId");
  if (!itemId) return NextResponse.json({ error: "Missing itemId" }, { status: 400 });

  const cookieId = await getCartCookieId();
  const cart = await getCartByCookieId(cookieId);
  if (!cart) return NextResponse.json({ error: "Cart not found" }, { status: 404 });

  const item = await prisma.cartItem.findUnique({ where: { id: itemId } });
  if (!item || item.cartId !== cart.id) return NextResponse.json({ error: "Item not found" }, { status: 404 });

  await prisma.cartItem.delete({ where: { id: itemId } });
  const refreshed = await getCartByCookieId(cookieId);
  return NextResponse.json(refreshed);
}
