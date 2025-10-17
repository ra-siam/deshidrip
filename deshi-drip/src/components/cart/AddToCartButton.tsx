"use client"

import { useCartStore } from '@/store/cart'

export function AddToCartButton({ productSlug }: { productSlug: string }) {
  const addItem = useCartStore((s) => s.addItem)
  return (
    <button
      onClick={() => addItem(productSlug, 1)}
      className="inline-flex items-center justify-center rounded bg-black text-white px-4 py-2 text-sm hover:bg-black/80"
    >
      Add to cart
    </button>
  )
}
