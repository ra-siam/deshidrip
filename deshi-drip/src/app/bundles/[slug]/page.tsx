import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatCurrencyFromCents } from "@/lib/currency";
import AddToCartButton from "@/components/AddToCartButton";

interface PageProps { params: { slug: string } }

export default async function BundleDetailPage({ params }: PageProps) {
  const bundle = await prisma.bundle.findUnique({
    where: { slug: params.slug },
    include: { items: { include: { product: { include: { images: true } } } } },
  });

  if (!bundle || !bundle.isActive) return notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">{bundle.title}</h1>
          {bundle.description && <p className="text-zinc-600 max-w-2xl">{bundle.description}</p>}
        </div>
        <Link href="/bundles" className="text-sm underline">All bundles</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {bundle.items.map((bi) => (
            <Link key={bi.id} href={`/products/${bi.product.slug}`} className="flex items-center gap-4 border rounded-lg p-3 hover:shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={bi.product.images[0]?.url || "/placeholder.png"} alt={bi.product.name} className="w-24 h-24 object-cover rounded" />
              <div>
                <div className="font-medium">{bi.product.name}</div>
                <div className="text-xs text-zinc-600">Qty {bi.quantity}</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="border rounded-lg p-4 space-y-4 h-fit">
          <div className="text-lg font-semibold">{formatCurrencyFromCents(bundle.bundlePriceCents)}</div>
          <AddToCartButton bundleId={bundle.id} />
        </div>
      </div>
    </div>
  );
}
