import { getWeeklyDrop, getWorldExclusives, getBundles } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { firstImage } from "@/lib/images";

export default async function Home() {
  const [weeklyDrop, exclusives, bundles] = await Promise.all([
    getWeeklyDrop(),
    getWorldExclusives(8),
    getBundles(),
  ])

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-4">Weekly Drop</h2>
        {weeklyDrop ? (
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Releases {new Date(weeklyDrop.releaseAt).toLocaleString()}</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {weeklyDrop.products.map((dp) => (
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
        ) : (
          <div className="text-gray-600">No weekly drops yet. Check back soon.</div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">World Exclusives</h2>
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
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Bundles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bundles.map((b) => (
            <div key={b.slug} className="border rounded-lg p-4">
              <div className="font-semibold">{b.title}</div>
              {b.description && <div className="text-sm text-gray-600 mb-2">{b.description}</div>}
              {b.discountPercent && (
                <div className="text-xs inline-block px-2 py-1 rounded bg-emerald-500/15 text-emerald-700">Save {b.discountPercent}%</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
