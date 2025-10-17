import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrencyFromCents } from "@/lib/currency";
import VariantSelector from "@/components/VariantSelector";
import AddToCartButton from "@/components/AddToCartButton";

interface PageProps { params: { slug: string } }

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, variants: true, brand: true },
  });
  if (!product || !product.isActive) return notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.images[0]?.url || "/placeholder.png"} alt={product.name} className="w-full aspect-square object-cover rounded-lg border" />
        <div className="grid grid-cols-4 gap-2">
          {product.images.slice(1, 5).map((img) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={img.id} src={img.url} alt={img.alt ?? product.name} className="w-full aspect-square object-cover rounded-md border" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <div className="text-sm text-zinc-600">{product.brand.name}</div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-zinc-600">{product.description}</div>
          {product.isWorldExclusive && (
            <div className="mt-2 inline-flex items-center text-xs font-medium bg-yellow-100 text-yellow-900 px-2 py-1 rounded">World Exclusive</div>
          )}
        </div>

        {product.variants.length > 0 ? (
          <VariantSelector
            productId={product.id}
            basePriceCents={product.basePriceCents}
            variants={product.variants.map(v => ({ id: v.id, size: v.size, color: v.color, priceCents: v.priceCents }))}
          />
        ) : (
          <div>
            <div className="text-lg font-semibold">{formatCurrencyFromCents(product.basePriceCents)}</div>
            <AddToCartButton productId={product.id} className="mt-2" />
          </div>
        )}
      </div>
    </div>
  );
}
