import { cookies } from "next/headers";
import { prisma } from "./prisma";
import { randomUUID } from "crypto";

export const CART_COOKIE = "cartId";

export async function getCartCookieId(): Promise<string | null> {
  const store = await cookies();
  return store.get(CART_COOKIE)?.value ?? null;
}

export async function ensureCartAndSetCookie() {
  const store = await cookies();
  let cookieId = store.get(CART_COOKIE)?.value;
  if (!cookieId) {
    cookieId = randomUUID();
    store.set(CART_COOKIE, cookieId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 180, // 180 days
    });
  }

  const cart = await prisma.cart.upsert({
    where: { cookieId },
    update: {},
    create: { cookieId },
    include: { items: { include: { product: true, variant: true, bundle: true } } },
  });

  return cart;
}

export async function getCartByCookieId(cookieId: string | null) {
  if (!cookieId) return null;
  return prisma.cart.findUnique({
    where: { cookieId },
    include: { items: { include: { product: true, variant: true, bundle: true } } },
  });
}

export function computeCartSubtotalCents(items: { priceCents: number; quantity: number }[]): number {
  return items.reduce((sum, item) => sum + item.priceCents * item.quantity, 0);
}
