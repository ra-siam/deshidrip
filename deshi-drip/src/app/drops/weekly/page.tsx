import { getWeeklyDrop } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import { firstImage } from '@/lib/images'

export default async function WeeklyDropsPage() {
  const drop = await getWeeklyDrop()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Weekly Drops</h1>
      {!drop && <div>No weekly drops available yet.</div>}
      {drop && (
        <div className="space-y-4">
          <div className="text-gray-600">Releases {new Date(drop.releaseAt).toLocaleString()}</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {drop.products.map((dp) => (
              <ProductCard
                key={dp.product.slug}
                slug={dp.product.slug}
                name={dp.product.name}
                priceCents={dp.product.priceCents}
                currency={dp.product.currency}
                image={firstImage(dp.product.images)}
                brandName={dp.product.brand?.name}
                worldExclusive={dp.product.worldExclusive}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
