import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProductBySlug } from '@/lib/data'
import { formatPriceFromCents } from '@/lib/format'
import { AddToCartButton } from '@/components/cart/AddToCartButton'
import { firstImage } from '@/lib/images'

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return notFound()
  const mainImage = firstImage(product.images)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        {mainImage ? (
          <div className="relative aspect-square">
            <Image src={mainImage} alt={product.name} fill className="object-cover rounded-lg" />
          </div>
        ) : (
          <div className="aspect-square rounded-lg bg-gray-100" />
        )}
      </div>
      <div className="space-y-4">
        <div className="text-sm text-gray-500">{product.brand?.name}</div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="text-xl">{formatPriceFromCents(product.priceCents, product.currency)}</div>
        {product.worldExclusive && (
          <div className="text-xs inline-block px-2 py-1 rounded bg-amber-500/15 text-amber-700">World Exclusive</div>
        )}
        <div className="space-y-2">
          <div className="text-sm font-medium">Select Variant</div>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v) => (
              <span key={v.id} className="px-3 py-1 rounded border text-sm">
                {v.title}
              </span>
            ))}
          </div>
        </div>
        <AddToCartButton productSlug={product.slug} />
      </div>
    </div>
  )
}
