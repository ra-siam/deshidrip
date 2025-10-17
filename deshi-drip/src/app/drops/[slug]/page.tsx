import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatCurrencyFromCents } from "@/lib/currency";

interface PageProps { params: { slug: string } }

export default async function DropDetailPage({ params }: PageProps) {
  const drop = await prisma.drop.findUnique({
    where: { slug: params.slug },
    include: { products: { include: { product: { include: { images: true } } } } },
  });
  if (!drop || !drop.isActive) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">{drop.title}</h1>
          {drop.description && <p className="text-zinc-600 max-w-2xl">{drop.description}</p>}
        </div>
        <Link href="/drops" className="text-sm underline">All drops</Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {drop.products.map((dp) => (
          <Link key={dp.productId} href={`/products/${dp.product.slug}`} className="group border rounded-lg p-3 hover:shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={dp.product.images[0]?.url || "/placeholder.png"} alt={dp.product.name} className="aspect-square object-cover rounded-md" />
            <div className="mt-2 text-sm">
              <div className="font-medium group-hover:underline">{dp.product.name}</div>
              <div className="text-zinc-600">{formatCurrencyFromCents(dp.product.basePriceCents)}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
