import { prisma } from '@/lib/prisma'
import type { Product, Brand } from '@prisma/client'

export type ProductWithBrand = Product & { brand: Brand | null }

export async function getBrands() {
  return prisma.brand.findMany({ orderBy: { name: 'asc' } })
}

export async function getBrandBySlugWithProducts(slug: string) {
  return prisma.brand.findUnique({
    where: { slug },
    include: {
      products: {
        where: { active: true },
        include: { variants: true },
        orderBy: { name: 'asc' },
      },
    },
  })
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { brand: true, variants: true },
  })
}

export async function getWeeklyDrop() {
  return prisma.drop.findFirst({
    where: { isWeekly: true, active: true },
    orderBy: { releaseAt: 'desc' },
    include: { products: { include: { product: { include: { brand: true } } }, orderBy: { position: 'asc' } } },
  })
}

export async function getWorldExclusives(limit = 12) {
  return prisma.product.findMany({
    where: { worldExclusive: true, active: true },
    include: { brand: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })
}

export async function getBundles() {
  return prisma.bundle.findMany({
    where: { active: true },
    include: { items: true },
    orderBy: { title: 'asc' },
  })
}

export async function searchProducts(query: string): Promise<ProductWithBrand[]> {
  const q = query.trim()
  if (!q) return [] as ProductWithBrand[]
  const results = await prisma.product.findMany({
    where: {
      active: true,
      OR: [
        { name: { contains: q } },
        { slug: { contains: q } },
        { brand: { name: { contains: q } } },
      ],
    },
    include: { brand: true },
    take: 50,
  })
  return results as unknown as ProductWithBrand[]
}
