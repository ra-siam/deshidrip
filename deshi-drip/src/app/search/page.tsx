import { searchProducts } from '@/lib/data'
import { ProductCard } from '@/components/ProductCard'
import { firstImage } from '@/lib/images'

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const results = q ? await searchProducts(q) : []
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Search</h1>
      <form action="/search" className="flex gap-2">
        <input name="q" defaultValue={q ?? ''} placeholder="Search products" className="border rounded px-3 py-2 flex-1" />
        <button className="px-4 py-2 rounded bg-black text-white">Search</button>
      </form>
      {q && (
        <div>
          <div className="text-sm text-gray-600 mb-3">Results for &quot;{q}&quot;</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((p) => (
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
      )}
    </div>
  )
}
