"use client"

import { useMemo } from 'react'
import { useCartStore } from '@/store/cart'
import { formatPriceFromCents } from '@/lib/format'

type ProductLite = {
  id: number
  slug: string
  name: string
  priceCents: number
  currency: string
}

type Props = {
  products: ProductLite[]
}

function computeBundleDiscount(items: { productSlug: string; quantity: number }[], products: ProductLite[]) {
  // Simple rule: if cart has any "tee" and any "cap", apply 15% off cheapest of pair once
  const tees = items.filter((i) => i.productSlug.includes('tee')).reduce((acc, i) => acc + i.quantity, 0)
  const caps = items.filter((i) => i.productSlug.includes('cap')).reduce((acc, i) => acc + i.quantity, 0)
  const pairs = Math.min(tees, caps)
  if (pairs <= 0) return 0
  // find cheapest among tee/cap in cart
  const eligible = items
    .filter((i) => i.productSlug.includes('tee') || i.productSlug.includes('cap'))
    .flatMap((i) => Array.from({ length: i.quantity }, () => i.productSlug))
    .slice(0, pairs * 2)
  const prices = eligible
    .map((slug) => products.find((p) => p.slug === slug)?.priceCents ?? 0)
    .sort((a, b) => a - b)
  if (prices.length < 2) return 0
  // 15% of cheapest item in each pair
  const discountPerPair = Math.round((prices[0] * 15) / 100)
  return discountPerPair * pairs
}

export function CartClient({ products }: Props) {
  const { items, addItem, removeItem, clear } = useCartStore()
  const lines = items.map((i) => ({ ...i, product: products.find((p) => p.slug === i.productSlug) }))
  const subtotal = lines.reduce((acc, l) => acc + (l.product?.priceCents ?? 0) * l.quantity, 0)
  const currency = lines[0]?.product?.currency ?? 'USD'
  const bundleDiscount = useMemo(() => computeBundleDiscount(items, products), [items, products])
  const total = Math.max(0, subtotal - bundleDiscount)

  return (
    <div className="space-y-4">
      {lines.length === 0 && <div>Your cart is empty.</div>}
      {lines.length > 0 && (
        <div className="space-y-3">
          {lines.map((l) => (
            <div key={l.productSlug} className="flex items-center justify-between border rounded p-3">
              <div className="flex-1">
                <div className="font-medium">{l.product?.name ?? l.productSlug}</div>
                <div className="text-sm text-gray-600">{formatPriceFromCents(l.product?.priceCents ?? 0, currency)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-2 py-1 border rounded" onClick={() => addItem(l.productSlug, -1)}>-</button>
                <span className="w-6 text-center">{l.quantity}</span>
                <button className="px-2 py-1 border rounded" onClick={() => addItem(l.productSlug, 1)}>+</button>
                <button className="ml-4 text-sm text-red-600" onClick={() => removeItem(l.productSlug)}>Remove</button>
              </div>
            </div>
          ))}

          <div className="border-t pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatPriceFromCents(subtotal, currency)}</span></div>
            {bundleDiscount > 0 && (
              <div className="flex justify-between text-emerald-700"><span>Bundle savings</span><span>-{formatPriceFromCents(bundleDiscount, currency)}</span></div>
            )}
            <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatPriceFromCents(total, currency)}</span></div>
          </div>

          <div className="flex gap-3">
            <button className="px-4 py-2 rounded bg-black text-white">Checkout</button>
            <button className="px-4 py-2 rounded border" onClick={clear}>Clear cart</button>
          </div>
        </div>
      )}
    </div>
  )
}
