import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const body = await req.json().catch(() => null) as { items?: { productSlug: string; quantity: number }[] } | null
  if (!body || !Array.isArray(body.items)) return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
  const slugs = [...new Set(body.items.map((i) => i.productSlug))]
  const products = await prisma.product.findMany({ where: { slug: { in: slugs } } })
  const subtotal = body.items.reduce((acc, i) => acc + (products.find((p) => p.slug === i.productSlug)?.priceCents ?? 0) * i.quantity, 0)
  // reuse bundle rule
  const tees = body.items.filter((i) => i.productSlug.includes('tee')).reduce((acc, i) => acc + i.quantity, 0)
  const caps = body.items.filter((i) => i.productSlug.includes('cap')).reduce((acc, i) => acc + i.quantity, 0)
  const pairs = Math.min(tees, caps)
  let discount = 0
  if (pairs > 0) {
    const eligible = body.items
      .filter((i) => i.productSlug.includes('tee') || i.productSlug.includes('cap'))
      .flatMap((i) => Array.from({ length: i.quantity }, () => i.productSlug))
      .slice(0, pairs * 2)
    const prices = eligible
      .map((slug) => products.find((p) => p.slug === slug)?.priceCents ?? 0)
      .sort((a, b) => a - b)
    const discountPerPair = Math.round((prices[0] * 15) / 100)
    discount = discountPerPair * pairs
  }
  return NextResponse.json({ subtotal, discount, total: Math.max(0, subtotal - discount) })
}
