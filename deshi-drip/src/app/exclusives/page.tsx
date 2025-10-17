import { getWorldExclusives } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import { firstImage } from '@/lib/images'

export default async function ExclusivesPage() {
  const exclusives = await getWorldExclusives(24)
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">World Exclusives</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {exclusives.map((p) => (
          <ProductCard
            key={p.slug}
            slug={p.slug}
            name={p.name}
            priceCents={p.priceCents}
            currency={p.currency}
            image={firstImage(p.images)}
            brandName={p.brand?.name}
            worldExclusive={p.worldExclusive}
          />
        ))}
      </div>
    </div>
  )
}
