import Link from 'next/link'
import { prisma } from '@/lib/prisma'
// import { formatPriceFromCents } from '@/lib/format'
import { CartClient } from '@/components/cart/CartClient'

export default async function CartPage() {
  // Let the client component read the store and compute totals, but we need catalog data for SSR
  const products = await prisma.product.findMany({ include: { brand: true } })
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      <CartClient products={products} />
      <div className="text-sm text-gray-600">
        <Link href="/">Continue shopping</Link>
      </div>
    </div>
  )
}
