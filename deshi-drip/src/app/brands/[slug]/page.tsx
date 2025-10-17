import { notFound } from 'next/navigation'
import { getBrandBySlugWithProducts } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import { firstImage } from '@/lib/images'

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = await getBrandBySlugWithProducts(slug)
  if (!brand) return notFound()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{brand.name}</h1>
        {brand.description && <p className="text-gray-600 dark:text-gray-400">{brand.description}</p>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {brand.products.map((p) => (
          <ProductCard
            key={p.slug}
            slug={p.slug}
            name={p.name}
            priceCents={p.priceCents}
            currency={p.currency}
            image={firstImage(p.images)}
            brandName={brand.name}
            worldExclusive={p.worldExclusive}
          />
        ))}
      </div>
    </div>
  )
}
