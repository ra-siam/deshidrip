import { NextRequest, NextResponse } from "next/server";
import { getCartByCookieId, getCartCookieId, computeCartSubtotalCents } from "@/lib/cart";
import { getShippingById } from "@/lib/shipping";

function urlEncode(body: Record<string, string | number>) {
  return Object.entries(body)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join("&");
}

export async function POST(req: NextRequest) {
  const storeId = process.env.SSLCZ_STORE_ID;
  const storePasswd = process.env.SSLCZ_STORE_PASSWORD;
  const sandbox = process.env.SSLCZ_SANDBOX !== "false"; // default true

  if (!storeId || !storePasswd) {
    return NextResponse.json({ error: "Missing SSLCOMMERZ credentials" }, { status: 500 });
  }

  const { shippingOptionId } = await req.json();
  const shipping = getShippingById(shippingOptionId) ?? null;

  const cookieId = await getCartCookieId();
  const cart = await getCartByCookieId(cookieId);
  if (!cart || cart.items.length === 0) return NextResponse.json({ error: "Cart empty" }, { status: 400 });

  const subtotal = computeCartSubtotalCents(cart.items);
  const totalCents = subtotal + (shipping?.priceCents ?? 0);
  const totalAmount = (totalCents / 100).toFixed(2);

  const origin = req.headers.get("origin") ?? "http://localhost:3000";
  const tranId = `DD-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const payload = {
    store_id: storeId,
    store_passwd: storePasswd,
    total_amount: totalAmount,
    currency: "BDT",
    tran_id: tranId,
    success_url: `${origin}/cart?success=1` ,
    fail_url: `${origin}/cart?failed=1`,
    cancel_url: `${origin}/cart?canceled=1`,
    // Customer placeholder
    cus_name: "Guest",
    cus_email: "guest@example.com",
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: "01700000000",
    // Product info minimal
    product_name: cart.items.map(i => i.nameSnapshot).slice(0, 5).join(", ") || "Cart Items",
    product_category: "Apparel",
    product_profile: "general",
    // Shipping
    shipping_method: shipping ? shipping.label : "N/A",
  };

  const endpoint = sandbox
    ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
    : "https://securepay.sslcommerz.com/gwprocess/v4/api.php";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: urlEncode(payload),
  });

  const data = await res.json().catch(async () => {
    const text = await res.text();
    try { return JSON.parse(text); } catch { return { status: "FAILED", raw: text }; }
  });

  if (!res.ok || !data || (data.status && data.status !== "SUCCESS")) {
    return NextResponse.json({ error: data?.failedreason || "Failed to create payment", data }, { status: 500 });
  }

  // GatewayPageURL contains the hosted payment URL
  const url: string | undefined = data.GatewayPageURL || data.redirectGatewayURL || data.redirect_url;
  if (!url) return NextResponse.json({ error: "No redirect URL from gateway", data }, { status: 500 });

  return NextResponse.json({ url });
}
