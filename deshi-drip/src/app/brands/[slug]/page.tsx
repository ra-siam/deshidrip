import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatCurrencyFromCents } from "@/lib/currency";

interface PageProps { params: { slug: string } }

export default async function BrandDetailPage({ params }: PageProps) {
  const brand = await prisma.brand.findUnique({ where: { slug: params.slug } });
  if (!brand || !brand.isActive) return notFound();

  const products = await prisma.product.findMany({
    where: { brandId: brand.id, isActive: true },
    include: { images: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">{brand.name}</h1>
          {brand.description && <p className="text-zinc-600 max-w-2xl">{brand.description}</p>}
        </div>
        <Link href="/brands" className="text-sm underline">All brands</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="group border rounded-lg p-3 hover:shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.images[0]?.url || "/placeholder.png"} alt={p.name} className="aspect-square object-cover rounded-md" />
            <div className="mt-2 text-sm">
              <div className="font-medium group-hover:underline">{p.name}</div>
              <div className="text-zinc-600">{formatCurrencyFromCents(p.basePriceCents)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
