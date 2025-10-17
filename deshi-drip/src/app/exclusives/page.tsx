import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { formatCurrencyFromCents } from "@/lib/currency";

export default async function ExclusivesPage({ searchParams }: { searchParams: { brand?: string } }) {
  const where: Prisma.ProductWhereInput = { isWorldExclusive: true, isActive: true };
  if (searchParams.brand) {
    where.brand = { slug: searchParams.brand };
  }

  const products = await prisma.product.findMany({
    where,
    include: { images: true, brand: true },
    orderBy: { name: "asc" },
  });

  const brands = await prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-bold">World Exclusives</h1>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-zinc-600">Filter:</span>
          <Link href={`/exclusives`} className="underline">All</Link>
          {brands.map((b) => (
            <Link key={b.id} href={`/exclusives?brand=${b.slug}`} className="underline">{b.name}</Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="group border rounded-lg p-3 hover:shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.images[0]?.url || "/placeholder.png"} alt={p.name} className="aspect-square object-cover rounded-md" />
            <div className="mt-2 text-sm">
              <div className="font-medium group-hover:underline">{p.name}</div>
              <div className="text-xs text-zinc-600">{p.brand.name}</div>
              <div className="text-zinc-600">{formatCurrencyFromCents(p.basePriceCents)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
