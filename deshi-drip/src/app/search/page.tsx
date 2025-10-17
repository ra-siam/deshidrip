import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { formatCurrencyFromCents } from "@/lib/currency";

export default async function SearchPage({ searchParams }: { searchParams: { q?: string; brand?: string; exclusive?: string } }) {
  const { q, brand, exclusive } = searchParams;

  const where: Prisma.ProductWhereInput = { isActive: true };
  if (q) where.name = { contains: q, insensitive: true } as Prisma.StringFilter<"Product">;
  if (brand) where.brand = { slug: brand };
  if (exclusive === "true") where.isWorldExclusive = true;

  const [products, brands] = await Promise.all([
    prisma.product.findMany({ where, include: { images: true, brand: true }, orderBy: { name: "asc" } }),
    prisma.brand.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Search</h1>

      <form className="flex flex-wrap gap-3 items-center" action="/search" method="get">
        <input name="q" defaultValue={q} placeholder="Search products" className="border rounded px-3 py-2 text-sm" />
        <select name="brand" defaultValue={brand ?? ""} className="border rounded px-3 py-2 text-sm">
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b.id} value={b.slug}>{b.name}</option>
          ))}
        </select>
        <label className="text-sm flex items-center gap-2">
          <input type="checkbox" name="exclusive" value="true" defaultChecked={exclusive === "true"} /> World exclusives only
        </label>
        <button className="rounded bg-black text-white text-sm px-3 py-2">Search</button>
      </form>

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
