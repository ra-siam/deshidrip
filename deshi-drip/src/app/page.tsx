import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const [featuredDrop, bundles, brands] = await Promise.all([
    prisma.drop.findFirst({
      where: { isActive: true },
      orderBy: { dropDate: "asc" },
      include: { products: { include: { product: { include: { images: true } } } } },
    }),
    prisma.bundle.findMany({ where: { isActive: true }, take: 3 }),
    prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-zinc-50 border border-zinc-200 p-6">
        <h1 className="text-2xl font-bold tracking-tight">Deshi Drip</h1>
        <p className="text-zinc-600">Weekly drops, curated bundles, and world exclusive pieces.</p>
      </section>

      {featuredDrop && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Next Weekly Drop</h2>
            <Link href="/drops" className="text-sm underline">View all</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDrop.products.map((dp) => (
              <Link key={dp.productId} href={`/products/${dp.product.slug}`} className="group border rounded-lg p-3 hover:shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={dp.product.images[0]?.url || "/placeholder.png"} alt={dp.product.name} className="aspect-square object-cover rounded-md" />
                <div className="mt-2 text-sm">
                  <div className="font-medium group-hover:underline">{dp.product.name}</div>
                  <div className="text-zinc-600">${(dp.product.basePriceCents / 100).toFixed(2)}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Bundles</h2>
          <Link href="/bundles" className="text-sm underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((b) => (
            <Link key={b.id} href={`/bundles/${b.slug}`} className="border rounded-lg p-4 hover:shadow-sm">
              <div className="font-medium">{b.title}</div>
              <div className="text-zinc-600 text-sm">${(b.bundlePriceCents / 100).toFixed(2)}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Brands</h2>
          <Link href="/brands" className="text-sm underline">View all</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {brands.map((br) => (
            <Link key={br.id} href={`/brands/${br.slug}`} className="border rounded-lg p-4 hover:shadow-sm text-center">
              <div className="font-medium">{br.name}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
